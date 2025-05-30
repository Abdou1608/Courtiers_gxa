import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { tierActions } from './tier.actions';
import { selectAllTiers,selectcurrent_shearch_items, selectTierLoading, selectTierError, selectCurrentTier } from './tier.selectors';

import { TierState } from './tier.state';
import { Tier } from '../../../core/Model/tier.model';

export class TierFacade {
  private store = inject<Store<TierState>>(Store);

  readonly all = toSignal(this.store.select(selectAllTiers), { initialValue: [] });
  readonly current_shearch_items= toSignal(this.store.select(selectcurrent_shearch_items), { initialValue: [] });
  readonly loading = toSignal(this.store.select(selectTierLoading), { initialValue: false });
  readonly error = toSignal(this.store.select(selectTierError), { initialValue: null });
  readonly selected = toSignal(this.store.select(selectCurrentTier), { initialValue: null });

  loadAll() {
    this.store.dispatch(tierActions.load());
  }

  getById(numtiers: number) {
    this.store.dispatch(tierActions.get({ numtiers }));
  }
  shearch_items(reference:any,dppname:string) {
    this.store.dispatch(tierActions.shearch({ reference,dppname }));
  }

  create(item: Tier) {
    this.store.dispatch(tierActions.create({ item }));
  }

  update(item: Tier) {
    this.store.dispatch(tierActions.update({ item }));
  }

  delete(numtiers: number) {
    this.store.dispatch(tierActions.delete({ numtiers }));
  }
}
