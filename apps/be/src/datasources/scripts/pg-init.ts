#!/usr/bin/env tsx

import { seed } from './pg-queries'
import { createTables } from './pg-tables'

createTables().then(() => seed(['insert']))
