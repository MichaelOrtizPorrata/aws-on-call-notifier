import { User } from "../../domain/entities/User";
import { NotificationRepositoryInterface } from "../interfaces/NotificationRepositoryInterface";
import { EmailMessageTemplate } from "../templates/MessageTemplates";

export class SendEmailUseCase {

    constructor(private user: User, private repository: NotificationRepositoryInterface) {}

    public async execute() : Promise<boolean> {

        if(!this.user.isEmailActive()) {
            return false;
        }
        
        if(!this.user.hasValidEmail()) {
            console.log(`UserId: ${this.user.userId}, has an invalid email address.`);
            return false;
        }

        await this.repository.notify(this.user.emailAddress, EmailMessageTemplate.htmlBody, EmailMessageTemplate.subject);

        return true;
    }
}