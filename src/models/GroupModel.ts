'use strict';

export default class GroupModel {
    newGroup: {
        selectedPlan: number
    }
    
    constructor() {
        this.newGroup = {
            selectedPlan: 0
        }
    }
}