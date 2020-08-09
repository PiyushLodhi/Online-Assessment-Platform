import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";  
import { Observable } from "rxjs";  
import { HttpServiceService } from "./http-service.service";   
import { TestModel, PremiumTest } from '../models/test-model.model';
import { delay } from 'rxjs/operators';
  
@Injectable()  
export class RouterResolve implements Resolve<TestModel[]> {  
  constructor(private httpService: HttpServiceService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<TestModel[]> {  
    return this.httpService.getTests();
  }  
}  

@Injectable()
export class getRoleResolve implements Resolve<string[]>{
  constructor(private httpService: HttpServiceService){
  }
  resolve(route: ActivatedRouteSnapshot): Observable<string[]> {  
    return this.httpService.getRoles();  
  }
}
@Injectable()  
export class getTestByIdRouterResolve implements Resolve<TestModel> {  
  constructor(private httpService: HttpServiceService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<TestModel> {  
      //console.log("Inside Resolve")
    return this.httpService.getTestById(route.queryParamMap.get('id'));  
  }  
}  

@Injectable()
export class getPremiumTestResolve implements Resolve<PremiumTest[]>{
  constructor(private httpService:HttpServiceService){}
  resolve(route:ActivatedRouteSnapshot):Observable<PremiumTest[]>{
    return this.httpService.getPremiumTests();
  }
}

export const routingResolve = [
  RouterResolve,
  getRoleResolve,
  getTestByIdRouterResolve,
  getPremiumTestResolve
]