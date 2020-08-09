import {Action} from '@ngrx/store';

import {TestBuildActionTypes} from '../shared/enum/test-buildActionTypes.enum'

export class ActionParent implements Action{
    type:any;
    payload : any;
}

export class FilterTopic implements ActionParent{
    type = TestBuildActionTypes.FilterTopic;

    constructor(public payload:any){
     
    }

}

export class FilterDifficulty implements ActionParent{
    type = TestBuildActionTypes.FilterDifficulty ;

    constructor(public payload:any){
        
    }

}

export class FilterType implements ActionParent{
    type = TestBuildActionTypes.FilterType ;

    constructor(public payload:any){

    }

}

export class PageNoChange implements ActionParent{
    type = TestBuildActionTypes.PageNoChange;

    constructor(public payload:any){

    }

}

export class AddCart implements ActionParent{
    type = TestBuildActionTypes.AddCart;

    constructor(public payload:any){
        
    }

}

export class RemoveCart implements ActionParent{
    type = TestBuildActionTypes.RemoveCart;

    constructor(public payload:any){

    }

}


export class SubmitCart implements ActionParent{
    type = TestBuildActionTypes.SubmitCart;

    constructor(public payload:any){

    }

}