import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { tierActions } from './tier.actions';
import { selectAllTiers, selectTierLoading, selectTierError, selectCurrentTier } from './tier.selectors';

import { TierState } from './tier.state';
import { Tier } from '../../../core/Model/tier.model';

export class TierFacade {
  private store = inject<Store<TierState>>(Store);

  readonly all = toSignal(this.store.select(selectAllTiers), { initialValue: [] });
  readonly loading = toSignal(this.store.select(selectTierLoading), { initialValue: false });
  readonly error = toSignal(this.store.select(selectTierError), { initialValue: null });
  readonly selected = toSignal(this.store.select(selectCurrentTier), { initialValue: null });

  loadAll() {
    this.store.dispatch(tierActions.load());
  }

  getById(numtiers: number) {
    this.store.dispatch(tierActions.get({ numtiers }));
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
