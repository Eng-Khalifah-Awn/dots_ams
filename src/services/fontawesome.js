// src/plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import only the icons you actually use
import { faBell, faHouse, faBars, faGlobe, faRightFromBracket, faFileCsv, faSearch, faFilePdf} from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faBell, faHouse, faBars, faGlobe, faRightFromBracket, faFileCsv, faSearch, faFilePdf)

export { FontAwesomeIcon }


