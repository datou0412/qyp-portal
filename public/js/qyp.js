var Qyp = {};

alertOptions = ['Danger','Default','Success','Primary','Warning','Info'];
for (var i = 0; i < alertOptions.length; i++) {
    Qyp['alert'+alertOptions[i]] = (function(index){
        return function(text) {
            $.toast(text, alertOptions[index].toLowerCase(), "top center");
        };
    })(i);
}

$.fn.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g,'');
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};



$(document)
    .on('click', '#J_sign_up_activity', function (e) {
        e.preventDefault();
        var $target = $(this);
        var $form = $target.closest('form');

        $form.validate();

        if (!$form.valid()) {
            return false;
        }

        var params = $form.serializeObject();
        params.memberId = params.phoneNumber;
        $.ajax({
            url: '/ajax/activity/signup',
            type: 'POST',
            data: params,
            success: function (result) {
                if (result.success) {
                    location.href = '/activity/' + params.activityId + '/signup/success'
                } else {
                    Qyp.alertDanger(result.errorMsg || '报名失败')
                }
            }
        });
    })
    .on('click', '#J_new_activity', function (e) {
        e.preventDefault();
        var $target = $(this);
        var $form = $target.closest('form');

        $form.validate();

        if (!$form.valid()) {
            return false;
        }

        var params = $form.serializeObject();
        params.activityDescription = editor.html()
        $.ajax({
            url: '/ajax/activity/new',
            type: 'POST',
            data: params,
            success: function (result) {
                if (result.success) {
                    Qyp.alertSuccess('创建活动成功');
                    location.href = '/activity/' + result.data.activityId + '/detail';
                } else {
                    Qyp.alertDanger(result.errorMsg || '创建活动失败');
                }
            }
        });
    })
    .on('click', '#saveEdit', function (e) {
        e.preventDefault();
         
            var params={};
            params.activityId="1";
            params.activityContent="1";
            $.ajax({
            url: '/ajax/activity/edit',
            type: 'POST',
            data: params,
            success: function (result) {
                if (result.success) {
                    Qyp.alertSuccess('保存成功');
                    
                } else {
                    Qyp.alertDanger(result.errorMsg || '保存失败');
                }
            }
             });
           
        return false;
        
    })
    .on('click', '.story', function (e) {
        e.preventDefault();
        var id  = $(this).data('id');
        location.href = '/activity/' + id + '/detail'
    })


$('input[data-init="datepicker"]').datepicker({
    timepicker: {
        hasHour: true,
        hasMinute: true,
        hasSecond: true,
    }
});



var editor;
if ($('textarea[name="activityDescription"]').length) {
    KindEditor.ready(function(K) {
        editor = K.create('textarea[name="activityDescription"]', {
            resizeType : 1,
            allowPreviewEmoticons : true,
            allowImageUpload : true,
            uploadJson : '/uploader/upload',
            //fileManagerJson : '../jsp/file_manager_json.jsp',
            items : [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist', '|', 'emoticons', 'image', 'link']
        });
    });
}
