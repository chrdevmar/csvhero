import { 
  APPLY_BULK_EDIT
} from '../../common/reducers/data';

export function applyBulkEdit(edit) {
  return {
    type: APPLY_BULK_EDIT,
    payload: edit
  }
}