import { PipeTransform, Pipe } from '@angular/core';
import { PremiumTest } from 'src/app/create-test-page/models/test-model.model';

@Pipe({
    name: 'testFilter'
})
export class TestFilterPipe implements PipeTransform{
    transform(tests:PremiumTest[],searchTest:string) : PremiumTest[]{
        if(!tests || !searchTest){
            return tests;
        }
        return tests.filter(test =>
            test.testName.toLowerCase().indexOf(searchTest.toLowerCase() ) !== -1);
    }
}