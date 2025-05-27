import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { Cont } from '../../../core/Model/cont.model';
import { contActions } from './cont.actions';
import { selectAllConts, selectContLoading, selectContError, selectCurrentCont } from './cont.selectors';

export class ContFacade {
  private store = inject(Store);

  readonly all = toSignal(this.store.select(selectAllConts));
  readonly loading = toSignal(this.store.select(selectContLoading));
  readonly error = toSignal(this.store.select(selectContError));
  readonly selected = toSignal(this.store.select(selectCurrentCont));

  loadAll() {
    this.store.dispatch(contActions.load());
  }

  getById(numCont: number) {
    this.store.dispatch(contActions.get({ numCont }));
  }

  create(item: Cont) {
    this.store.dispatch(contActions.create({ item }));
  }

  update(item: Cont, numCont:any) {
    this.store.dispatch(contActions.update({ item, numCont }));
  }

  delete(numCont: any) {
    this.store.dispatch(contActions.delete({ numCont }));
  }
  select_current(item:Cont) {
    this.store.dispatch(contActions.select_current_item({ item}));
  }
}
