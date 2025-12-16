export class SmartContract {
    private message: string;

    constructor(initialMessage: string) {
        // Khởi tạo message với giá trị ban đầu
        this.message = initialMessage;
    }

    public updateMessage(newMsg: string): void {
        // Cập nhật message với giá trị mới
        this.message = newMsg;
    }

    public getMessage(): string {
        // Trả về message hiện tại
        return this.message;
    }
}