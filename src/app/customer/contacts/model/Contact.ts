export class Address {
    id = -1;
    addressReference: string;
    sourceReference: string;
    sourceType: string;
    postCode: number;
    country: string;
    city: string;
    street: string;
    addressType: string;
    creator: string;
    created: Date;
    event: string;
    sequence: number;
}

export class Telephone {
    id = -1;
    telephoneReference: string;
    sourceReference: string;
    sourceType: string;
    telephone: string;
    telephoneType: string;
    creator: string;
    created: Date;
    event: string;
    sequence: number;
}

export class Website {
    id = -1;
    websiteReference: string;
    sourceReference: string;
    sourceType: string;
    website: string;
    websiteType: string;
    creator: string;
    created: Date;
    event: string;
    sequence: number;
}

export class EMail {
    id = -1;
    emailReference: string;
    sourceReference: string;
    sourceType: string;
    email: string;
    emailType: string;
    creator: string;
    created: Date;
    event: string;
    sequence: number;
}

export class SocialMedia {
    id = -1;
    socialMediaReference: string;
    sourceReference: string;
    sourceType: string;
    socialMedia: string;
    socialMediaType: string;
    creator: string;
    created: Date;
    event: string;
    sequence: number;
}

export class Contact {
    id = -1;
    contactReference: string;
    salutation: string;
    firstname: string;
    secondname: string;
    surname: string;
    image: any [];
    birthday: Date;
    contactType: string;
    contactSource: string;
    addresses: Address[];
    telephones: Telephone[];
    socialMedias: SocialMedia [];
    websites: Website[];
    emails: EMail[];
    comment: string;
    creator: string;
    created: Date;
    event: string;
    sequence: number;
}

export class ContactRestResult {
    contacts: Contact [];
}
