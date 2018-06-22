'use strict';
import {find} from 'lodash';
import {CommonService} from "./commonService";

export class TagsService {
    tags = [];
    commonService = new CommonService();

    static GetTagByTitle(tags, title) {
        const foundTag = find(tags, {title});
        return foundTag
    }

    static TagsContainsByTitle(tags, title){
        const foundTag = TagsService.GetTagByTitle(tags, title);
        if (foundTag === null || foundTag === undefined)
            return false;
        return true;
    }
}