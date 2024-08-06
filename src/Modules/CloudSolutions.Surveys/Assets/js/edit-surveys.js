document.addEventListener('DOMContentLoaded', function () {

    let enableDailyLimit = document.getElementById('SurveyRestrictionPart_EnableDailyLimit_Value');
    let dailyMaxWrapper = document.getElementById('SurveyRestrictionPart_MaxDailyAllowed_Value_FieldWrapper');

    if (enableDailyLimit && dailyMaxWrapper) {

        enableDailyLimit.addEventListener('change', function (e) {

            if (e.target.checked) {
                dailyMaxWrapper.classList.remove('d-none');
            } else {
                dailyMaxWrapper.classList.add('d-none');
            }

        });

        enableDailyLimit.dispatchEvent(new Event('change'));

    }


    let enableWeeklyLimit = document.getElementById('SurveyRestrictionPart_EnableWeeklyLimit_Value');
    let weeklyMaxWrapper = document.getElementById('SurveyRestrictionPart_MaxWeeklyAllowed_Value_FieldWrapper');

    if (enableWeeklyLimit && weeklyMaxWrapper) {

        enableWeeklyLimit.addEventListener('change', function (e) {

            if (e.target.checked) {
                weeklyMaxWrapper.classList.remove('d-none');
            } else {
                weeklyMaxWrapper.classList.add('d-none');
            }

        });

        enableWeeklyLimit.dispatchEvent(new Event('change'));
    }

});