import { Injectable } from '@angular/core';
import {
  IErrorResponse,
  TUserAction,
  IActionMessage,
} from '../models/general.model';

@Injectable({
  providedIn: 'root',
})
export class ResponseMapperService {
  defaultErrorMessage: string = 'Failed attempt, please try again later';

  messageMap: Record<TUserAction, IActionMessage> = {
    signup: {
      success: 'User successfully created',
      error: {
        typeError: 'errorMesage',
      },
    },
    signin: {
      success: 'Login successful. Welcome back!',
      error: {
        typeError: 'errorMesage',
      },
    },
    profile: {
      success: 'Profile success',
      error: {
        typeError: 'errorMesage',
      },
    },
    profileUpdate: {
      success: 'Username successfully changed',
      error: {
        typeError: 'errorMesage',
      },
    },
    logout: {
      success: 'You have successfully logged out',
      error: {
        typeError: 'errorMesage',
      },
    },
    groupList: {
      success: 'Group list successfully received',
      error: {
        typeError: 'errorMesage',
      },
    },
    groupCreate: {
      success: 'Group created successfully',
      error: {
        typeError: 'errorMesage',
      },
    },
    groupRemove: {
      success: 'Group deleted successfully',
      error: {
        typeError: 'errorMesage',
      },
    },
    groupUpdate: {
      success: 'Group list updated successfully',
      error: {
        typeError: 'errorMesage',
      },
    },
    userList: {
      success: 'User list successfully received',
      error: {
        typeError: 'errorMesage',
      },
    },
    userListUpdate: {
      success: 'User list updated successfully',
      error: {
        typeError: 'errorMesage',
      },
    },
    conversationsList: {
      success: 'Conversations list successfully received',
      error: {
        typeError: 'errorMesage',
      },
    },
  };

  getSuccessMessage(action: TUserAction): string {
    return this.messageMap[action]?.success;
  }

  getErrorMessage(resError: IErrorResponse): string {
    // TO DO MAP TYPE ERROR
    if (resError?.error?.message) {
      return resError.error.message;
    }

    return this.defaultErrorMessage;
  }
}
