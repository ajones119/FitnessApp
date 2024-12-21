/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedDashboardImport } from './routes/_authenticated/dashboard'
import { Route as AuthenticatedMacrosIndexImport } from './routes/_authenticated/macros/index'
import { Route as AuthenticatedLiftingIndexImport } from './routes/_authenticated/lifting/index'
import { Route as AuthenticatedCardioIndexImport } from './routes/_authenticated/cardio/index'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedDashboardRoute = AuthenticatedDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedMacrosIndexRoute = AuthenticatedMacrosIndexImport.update({
  id: '/macros/',
  path: '/macros/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLiftingIndexRoute = AuthenticatedLiftingIndexImport.update({
  id: '/lifting/',
  path: '/lifting/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedCardioIndexRoute = AuthenticatedCardioIndexImport.update({
  id: '/cardio/',
  path: '/cardio/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/dashboard': {
      id: '/_authenticated/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/cardio/': {
      id: '/_authenticated/cardio/'
      path: '/cardio'
      fullPath: '/cardio'
      preLoaderRoute: typeof AuthenticatedCardioIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/lifting/': {
      id: '/_authenticated/lifting/'
      path: '/lifting'
      fullPath: '/lifting'
      preLoaderRoute: typeof AuthenticatedLiftingIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/macros/': {
      id: '/_authenticated/macros/'
      path: '/macros'
      fullPath: '/macros'
      preLoaderRoute: typeof AuthenticatedMacrosIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedDashboardRoute: typeof AuthenticatedDashboardRoute
  AuthenticatedCardioIndexRoute: typeof AuthenticatedCardioIndexRoute
  AuthenticatedLiftingIndexRoute: typeof AuthenticatedLiftingIndexRoute
  AuthenticatedMacrosIndexRoute: typeof AuthenticatedMacrosIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDashboardRoute: AuthenticatedDashboardRoute,
  AuthenticatedCardioIndexRoute: AuthenticatedCardioIndexRoute,
  AuthenticatedLiftingIndexRoute: AuthenticatedLiftingIndexRoute,
  AuthenticatedMacrosIndexRoute: AuthenticatedMacrosIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/cardio': typeof AuthenticatedCardioIndexRoute
  '/lifting': typeof AuthenticatedLiftingIndexRoute
  '/macros': typeof AuthenticatedMacrosIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteWithChildren
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/cardio': typeof AuthenticatedCardioIndexRoute
  '/lifting': typeof AuthenticatedLiftingIndexRoute
  '/macros': typeof AuthenticatedMacrosIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authenticated/dashboard': typeof AuthenticatedDashboardRoute
  '/_authenticated/cardio/': typeof AuthenticatedCardioIndexRoute
  '/_authenticated/lifting/': typeof AuthenticatedLiftingIndexRoute
  '/_authenticated/macros/': typeof AuthenticatedMacrosIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/dashboard' | '/cardio' | '/lifting' | '/macros'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/dashboard' | '/cardio' | '/lifting' | '/macros'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/_authenticated/dashboard'
    | '/_authenticated/cardio/'
    | '/_authenticated/lifting/'
    | '/_authenticated/macros/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/dashboard",
        "/_authenticated/cardio/",
        "/_authenticated/lifting/",
        "/_authenticated/macros/"
      ]
    },
    "/_authenticated/dashboard": {
      "filePath": "_authenticated/dashboard.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/cardio/": {
      "filePath": "_authenticated/cardio/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/lifting/": {
      "filePath": "_authenticated/lifting/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/macros/": {
      "filePath": "_authenticated/macros/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */