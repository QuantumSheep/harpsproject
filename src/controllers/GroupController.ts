"use strict";

import { Request, Response } from "express";
import { GroupModel } from '../models/GroupModel';

export class GroupController {
    public static index(req: Request, res: Response) {

    }

    public static newGroup(req: Request, res: Response) {
        let model = new GroupModel();

        if (['0', '1', '2'].indexOf(req.query.selected) > -1) {
            model.newGroup.selectedPlan = parseInt(req.query.selected);
        }
        
        res.render(`group/new`, { model: model });
    }
}