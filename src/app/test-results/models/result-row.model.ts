export class CandidateResultData {
    public candid : number ;
    public FirstName : string ;
    public LastName : string ;
    public Marks : number ; 
    public Email : string ;
}

export class ResultRow {
    public date: Date;
    public candidateResultData : CandidateResultData[] = [];
}