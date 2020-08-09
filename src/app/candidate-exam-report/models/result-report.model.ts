export class TopicPerformance {
    public Name : string ;
    public TopicTotal : number ;
    public TopicCorrect : number ;
    public TopicIncorrect : number ; 
    public TopicMarks : number ;
    public TopicMarksTotal : number ;
}

export class SectionPerformance {
    public Name : string ;
    public SectionTotal : number ;
    public SectionCorrect : number ;
    public SectionIncorrect : number ; 
    public SectionMarks : number ;
    public SectionMarksTotal : number ;
}

export class PerformanceData {
    public FirstName : string ;
    public LastName : string ;
    public Gender : string ;
    public Email : string ;
    public Contact : string ;
    public DOB: Date;
    public candid : number ;
    public Country : string ;

    public TotalQuestions : number ;
    public TotalCorrect : number ;
    public TotalIncorrect : number ;
    public TotalMarks : number ;
    public TotalTestMarks : number ;

    public topicPerformance : TopicPerformance[] = [];
    public sectionPerformance : SectionPerformance[] = [];
}