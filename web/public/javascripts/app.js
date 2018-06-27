(function() {
    $('.answers').hide();
    $('.loading').hide();
    $('#form').submit(onFormSubmit);
    $('.dropdown-menu li > a').click(onExamplesClick);
    $('.classify-text').val("This position requires an employee who can work closely with the office accountant to perform various bookkeeping functions.The ideal employee will work under the supervision of the office accountant to ensure that all transactions are posted and receipts and disbursements are processed efficiently and accurately. The employee will help the accountant monitor the daily financial operation of the agency, including the monitoring of  financial transactions on estate accounts. The employee will also perform monthly bank reconciliations on estate accounts, make bank deposits,  administer the opening and closing of all estate investment accounts, provide support to the accountant as the assistant liaison to banks, perform  accounting investigations on new estate cases for burials, open and inventory decedents' safe deposit boxes, compile monthly reports regarding  closed estates, assist in the preparation of the Public Administrator's annual report to the ");

    function onFormSubmit() {
        var text = $('.classify-text').val();
        $('.loading').show();
        $('.answers').hide();
        $('.classify-btn').prop('disabled', true);
        $.post("/classify", {text: text}, function(data) {
            renderAnswer(data)
        }).fail(function(err) {
            renderAnswer(err);
        });
        return false;
    }

    function onExamplesClick() {
        var text = this.innerHTML;
        $('.classify-text').val(text);
        if (text && text.length > 1) {
            $('#form').submit();
        }
    }

    function renderAnswer(data) {
        if (!data.classes || !data.classes.length > 0) {
            $('.answer').html('Something went wrong :-(');
        } else {
            var top = data.classes[0]
            $('.answer').html(top.class_name.toUpperCase());
            $('.confidence').html('Confidence: '+Math.floor(top.confidence*100 +0.8).toFixed(0)+'%');
        }

        $('.classify-btn').prop('disabled', false);
        $('.answers').show();
        $('.loading').hide();
    }
}());
