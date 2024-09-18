export class FavStorage {
  static KEY = 'favs';

  public static getAllIds(): number[] {
    let rawIds: number[];

    try {
      rawIds = JSON.parse(sessionStorage.getItem(FavStorage.KEY) ?? '[]');
    } catch (e) {
      sessionStorage.setItem(FavStorage.KEY, '[]');
      rawIds = [];
    }

    return rawIds;
  }

  public static setId(id: number) {
    const ids = FavStorage.getAllIds();
    ids.push(id);
    sessionStorage.setItem(FavStorage.KEY, JSON.stringify(ids));
  }

  public static removeId(rmId: number) {
    const ids = FavStorage.getAllIds();
    const withoutGivenId = ids.filter((id) => id != rmId);
    sessionStorage.setItem(FavStorage.KEY, JSON.stringify(withoutGivenId));
  }

  public static idExists(id: number): boolean {
    const ids = FavStorage.getAllIds();
    return ids.includes(id);
  }
}
