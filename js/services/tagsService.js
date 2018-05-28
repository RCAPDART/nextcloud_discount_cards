'use strict';
import {find} from 'lodash';
import {CommonService} from "./commonService";
import { MockService } from "./MockService";

export class TagsService {
    tags = [];
    commonService = new CommonService();

    GetTagsFromApi() {
        return MockService.GetTagsPlaceholder();
    }

    GetTags() {
        this.tags = this.GetTagsFromApi();
        return this.tags;
    }

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

    GetTagById(id) {
        const foundTag = find(this.tags, {id});
        return foundTag
    }
}