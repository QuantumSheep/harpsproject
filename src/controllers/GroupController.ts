import { Request, Response } from "express";
import GroupModel from '../models/GroupModel';

'use strict'

export default class GroupController {
    public static index(req: Request, res: Response) {
        
    }

    public static newGroup(req: Request, res: Response) {
        if(req.query.select == '0') {

        } else if(req.query.select == '1') {

        }
    }
}