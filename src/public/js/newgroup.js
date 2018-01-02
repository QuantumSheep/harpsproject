var plans = ['0', '1', '2'];

var choicesObj = {
    allPlans: document.querySelectorAll('[data-plan]'),
    plan: document.getElementById("plan")
};

choicesObj.allPlans.forEach(function (element) {
    element.addEventListener('click', function (event) {
        choicesObj.plan.value = this.attributes['data-plan'].value;

        choicesObj.allPlans.querySelectorAll('[data-plan]').forEach(function (element) {
            if(element.classList.contains('active')) {
                element.classList.remove('active');
                return;
            }
        });

        this.classList.add("active");
    }, false);
});