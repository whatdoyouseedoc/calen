import { IdGenService } from './id-gen.service';

describe('IdGenService test', () => {
  const srv = new IdGenService();

  it('should generate string with given length', () => {
    expect(srv.getId(8).length).toEqual(8);
    expect(srv.getId(16).length).toEqual(16);
    expect(srv.getId(32).length).toEqual(32);
  });

  it('should generate string 16 length without given len', () => {
    expect(srv.getId().length).toEqual(16);
  });

  it('should generate unique strings', () => {
    const ids = [...Array(1000)].fill(0).map(() => srv.getId(16));

    expect(ids.some((it, idx, arr) => it === arr[idx + 1])).toBe(false);
  });
});
