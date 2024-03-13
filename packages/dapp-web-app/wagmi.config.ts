import 'dotenv/config'
import { defineConfig } from '@wagmi/cli'
import { actions, react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/web3/contract-functions.ts',
  contracts: [],
  plugins: [react(), actions()],
})
