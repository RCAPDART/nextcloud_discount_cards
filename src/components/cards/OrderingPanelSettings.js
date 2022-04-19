export class OrderingPanelSettings {
  static GetOrderingKeys() {
    return [
      {
        id: 1,
        title: 'Title',
        key: 'title',
        default: null,
      },
      {
        id: 2,
        title: 'Color',
        key: 'color',
        default: null,
      },
      {
        id: 3,
        title: 'Popularity',
        key: 'clickcount',
        default: 'DESC',
      },
    ];
  }
}
