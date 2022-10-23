export interface InvitationEvent {
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

export interface InvitationResponse {
	rsvpResponse: string;
	dietaryPreferences: Array<string>;
	specialDietaryRequests: string;
}
