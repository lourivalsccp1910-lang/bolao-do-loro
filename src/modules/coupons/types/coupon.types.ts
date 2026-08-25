export interface Coupon {
  id: string;
  participantId: string;
  championshipId: string;
  number: number;
  createdAt: string;
}

export interface CouponFormData {
  participantId: string;
  championshipId: string;
}