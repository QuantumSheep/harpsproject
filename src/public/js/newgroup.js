"use strict";

var plans = ['0', '1', '2'];

var choicesObj = {
    plan: document.getElementById("plan")
};

document.querySelectorAll('[data-plan]').forEach(function (element) {
    element.addEventListener('click', function (event) {
        choicesObj.plan.value = this.attributes['data-plan'].value;

        document.querySelectorAll('[data-plan]').forEach(function (element) {
            if(element.classList.contains('active')) {
                element.classList.remove('active');
                return;
            }
        });

        this.classList.add("active");
    }, false);
});