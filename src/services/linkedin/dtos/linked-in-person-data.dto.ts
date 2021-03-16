import { LinkedInSkillDto } from 'services/linkedin/dtos/linked-in-skill.dto';
import { LinkedInPositionDto } from 'services/linkedin/dtos/linked-in-position.dto';

export class LinkedInPersonDataDto {
    positions?: LinkedInPositionDto[];
    fieldOfStudy?: string;
    skills?: LinkedInSkillDto[];
    location?: string;
}
