import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { <%= classify(name) %> } from '../<%= dasherize(name) %>.model';
import { <%= camelize(name) %>Actions } from './<%= dasherize(name) %>.actions';
import { selectAll<%= classify(name) %>s, select<%= classify(name) %>Loading, select<%= classify(name) %>Error, selectCurrent<%= classify(name) %> } from './<%= dasherize(name) %>.selectors';

export class <%= classify(name) %>Facade {
  private store = inject(Store);

  readonly all = toSignal(this.store.select(selectAll<%= classify(name) %>s));
  readonly loading = toSignal(this.store.select(select<%= classify(name) %>Loading));
  readonly error = toSignal(this.store.select(select<%= classify(name) %>Error));
  readonly selected = toSignal(this.store.select(selectCurrent<%= classify(name) %>));

  loadAll() {
    this.store.dispatch(<%= camelize(name) %>Actions.load());
  }

  getById(id: number) {
    this.store.dispatch(<%= camelize(name) %>Actions.get({ id }));
  }

  create(item: <%= classify(name) %>) {
    this.store.dispatch(<%= camelize(name) %>Actions.create({ item }));
  }

  update(item: <%= classify(name) %>) {
    this.store.dispatch(<%= camelize(name) %>Actions.update({ item }));
  }

  delete(id: number) {
    this.store.dispatch(<%= camelize(name) %>Actions.delete({ id }));
  }
}
