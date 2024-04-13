// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext, NextFunction } from '../declarations'
import { logger } from '../logger'
import { MeshError } from '../utils/error'

export const logError = async (context: HookContext) => {
  if(context.error){
    context.error = new MeshError(context.error)
  }

  return context;
}
