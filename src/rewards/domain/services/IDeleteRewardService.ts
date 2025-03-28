export const DELETE_REWARD_SERVICE = Symbol('IDeleteRewardService')

export interface IDeleteRewardService {
  run(id: number): Promise<{ success: boolean }>
}
