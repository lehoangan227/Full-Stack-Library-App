/**
 * Làm sạch các tham số bằng cách xóa các khóa có giá trị là null, undefined, hoặc chuỗi rỗng.
 * @param params Đối tượng chứa các tham số cần làm sạch.
 * @returns Một đối tượng mới chỉ chứa các tham số đã được làm sạch.
 */
export const cleanParam = <T extends Record<string, any>>(params: T): Partial<T> => {
  // Tạo một bản sao nông (shallow copy) của đối tượng tham số.
  // Sử dụng 'as Partial<T>' để đảm bảo rằng kiểu trả về phản ánh việc
  // một số khóa có thể bị xóa khỏi T.
  const cleanedParams: Partial<T> = { ...params };

  // Lặp qua tất cả các khóa (key) trong bản sao
  (Object.keys(cleanedParams) as Array<keyof T>).forEach((key) => {
    const value = cleanedParams[key];
    
    // Kiểm tra nếu giá trị là null, undefined, hoặc chuỗi rỗng
    if (value === null || value === undefined || value === "") {
      // Xóa khóa khỏi đối tượng đã sao chép
      delete cleanedParams[key];
    }
  });

  return cleanedParams;
};