import * as fromConfig from '../config';

export default {
  notification: {
    timeout: 5000,
    color: 'green',
    mode: '',
    y: 'bottom',
    x: 'right',
    show: false,
    text: 'Success',
    closeColor: 'white',
    closeText: 'Close'
  },
  ajaxLoader: false,
  totalCount: 0,
  criteriaCounts: {},
  criteriaCountsLoading: [],
  segmentCount: false,
  segmentCountLoading: false,
  tablesBlueprint: [],
  segmentCategories: [],
  selectedTable: null,
  selectedFields: [],
  selectedCriterias: [],
  selectedParameters: [],
  suggestedSegments: [],
  suggestedSegmentsLoading: false,
  savingSegmentLoading: false,
  segmentName: '',
  segmentID: null,
  segmentCategoryID: null
};
