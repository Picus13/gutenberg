/**
 * Internal dependencies
 */
import { searchForBlock } from './search-for-block';

/**
 * Opens the inserter, searches for the given term, then selects the first
 * result that appears.
 *
 * @param {string} searchTerm  The text to search the inserter for.
 */
export async function insertBlock( searchTerm ) {
	await searchForBlock( searchTerm );
	const insertButton = (
		await page.$x( `//button//span[contains(text(), '${ searchTerm }')]` )
	 )[ 0 ];
	await insertButton.click();

	// Effectively, we're waiting for the block to be rendered in the block editor
	// before continuing. This is the easiest way to solve that problem without
	// trying to overengineer a way to find the selector of the added block.
	const delay = () =>
		new Promise( ( resolve ) => setTimeout( resolve, 300 ) );
	await delay();
}
