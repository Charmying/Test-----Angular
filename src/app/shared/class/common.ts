export class BaseCommonObj {
  id = '';
  name = '';

  constructor(data: Partial<BaseCommonObj> = {}) {
    Object.assign(this, data);
  }
}

export class BasicSelect {
  id = '';
  name = '';
  state = false;

  constructor(data: Partial<BasicSelect>) {
    Object.assign(this, data);
  }
}
