export interface Transaction {
  id: String;
  amount: Number;
  description: String;
  isSuspicious: Boolean;
  isAllowed: Boolean;
  comment: String;
}

export interface UpdateTransaction {
  id?: String;
  amount?: Number;
  description?: String;
  isSuspicious?: Boolean;
  isAllowed?: Boolean;
  comment?: String;
}

export interface ServiceResp {
  message: String;
  status: Boolean;
  data: Transaction;
}
