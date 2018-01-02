"use strict";

export class GroupModel {
    newGroup: {
        selectedPlan: number
    }
    
    constructor() {
        this.newGroup = {
            selectedPlan: -1
        }
    }
}