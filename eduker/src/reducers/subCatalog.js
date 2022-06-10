
const initState = {
    subCatalogs:[],
    createSuccess: false,
    updateSuccess: false,
    subCatalog:{},
};

export const subCatalogReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_SUBCATALOG':
            {
                return {
                    ...state,
                    subCatalogs: action.subCatalogs
                }
            }

        case 'SEARCH_SUBCATALOG':
            {
                return {
                    ...state,
                    subCatalogs: action.subCatalogs
                }
            }
        
        case 'CREATE_SUBCATALOG':
            {
                return {
                    ...state,
                    createSuccess: true
                }
            }
    
        case 'UPDATE_SUBCATALOG':
            {
                return {
                    ...state,
                    updateSuccess: true
                }
            }

        case 'GET_SUBCATALOG_BY_ID':
            {
                return {
                    ...state,
                    subCatalog: action.subCatalog
                }
            }

        default:
            {
                return {...state };
            }
    }
}