import { FakeModule } from './fakeModule';

export class FakeMapViewModule extends FakeModule {
  ui = {
    add: () => {
      return;
    },
  };
}
