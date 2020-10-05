export class Task {
    public static fromJSON(maybe: any): Task {
        if (!maybe) {
            throw new Error('Task should be of type object');
        }
        return new Task(
            maybe.userId,
            maybe.taskId,
            maybe.title,
            maybe.description,
            maybe.category,
            maybe.time,
            maybe.isFinished
        );
    }

    public userId: string;
    public taskId: string;
    public title: string;
    public description: string;
    public category: string;
    public time: string;
    public isFinished: boolean;

    constructor(
        userId: string,
        taskId: string,
        title: string,
        description: string,
        category: string,
        time: string,
        isFinished: boolean
    ) {
        this.userId = userId;
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.time = time;
        this.isFinished = isFinished;
    }

    public toJSON() {
        return {
            userId: this.userId,
            taskId: this.taskId,
            title: this.title,
            description: this.description,
            category: this.category,
            time: this.time,
            isFinished: this.isFinished,
        };
    }
}
