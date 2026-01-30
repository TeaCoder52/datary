import { BiLogoPostgresql } from 'react-icons/bi'
import { GrMysql } from 'react-icons/gr'
import { LuDatabase } from 'react-icons/lu'

import type { DatabaseConnection } from '../../../entities/connection/model/connection.types'

export function getConnectionIcon(type: DatabaseConnection['connectionType']) {
	switch (type) {
		case 'postgresql':
			return <BiLogoPostgresql className="text-primary size-5" />
		case 'mysql':
			return <GrMysql className="h-4 w-4 text-orange-400" />
		default:
			return <LuDatabase className="text-sidebar-muted h-4 w-4" />
	}
}
