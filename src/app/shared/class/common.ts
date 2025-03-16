export class BaseCommonObj {
  id = '';
  name = '';

  constructor(data: Partial<BaseCommonObj> = {}) {
    Object.assign(this, data);
  }
}
