import { Category, CategoryResponse } from '../types';

export const categoriesAdapter = (response: CategoryResponse[]) => {
	const result: Category[] = response.map(
		(category: CategoryResponse) => {
			return {
				id: category._id,
				name: category.name,
				products: category.products.length,
			};
		},
	);

	return result;
};
