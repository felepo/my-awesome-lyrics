import { generatePagination } from '../utils';

describe('generatePagination', () => {
  it('returns all pages if totalPages <= 7', () => {
    expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(generatePagination(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('shows ellipsis for large page sets (start)', () => {
    expect(generatePagination(2, 10)).toEqual([1, 2, 3, '...', 9, 10]);
    expect(generatePagination(3, 10)).toEqual([1, 2, 3, '...', 9, 10]);
  });

  it('shows ellipsis for large page sets (end)', () => {
    expect(generatePagination(8, 10)).toEqual([1, 2, '...', 8, 9, 10]);
    expect(generatePagination(10, 10)).toEqual([1, 2, '...', 8, 9, 10]);
  });

  it('shows ellipsis for large page sets (middle)', () => {
    expect(generatePagination(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
    expect(generatePagination(6, 11)).toEqual([1, '...', 5, 6, 7, '...', 11]);
  });
}); 