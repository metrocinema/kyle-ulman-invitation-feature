export interface InvInvitation {
	rsvpResponse: string;
}

export interface InvEvent {
	posterUrl: string;
	showTitle: string;
	hostMessage: string;
	hostPreferredName: string;
	eventTitle: string;
	hostFirstName: string;
	hostLastName: string;
	eventDateStart: string;
	eventDateEnd: string;
	specialInstructions: string;
}

export interface InvGuest {
	dietaryPreferences: Array<string>;
	specialDietaryRequests: string;
}
