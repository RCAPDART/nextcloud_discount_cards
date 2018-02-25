export default (state = { key: 'order', ascending: true }, action) => {
	switch (action.type) {
		case 'CHANGE_ORDER_RULES':
			return { key: 'order', ascending: true };
		default:
			return { key: 'name', ascending: true }
	}
}