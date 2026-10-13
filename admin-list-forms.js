/**
 * 목록 페이지 관리자 글쓰기/수정 폼
 * - 기본: DOM에 폼 없음 (크롤러·방문자 소스에 Secret/Submit 등 노출 방지)
 * - 관리자: URL에 ?admin=1 한 번 열면 sessionStorage에 잠금 해제, 이후 폼 주입
 * - 잠금: ?admin=0
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'ees-admin-forms';
  var params = new URLSearchParams(window.location.search);
  if (params.get('admin') === '1') {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (_) {}
  }
  if (params.get('admin') === '0') {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  }

  function isAdminUnlocked() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function stripPublicAdminForms() {
    ['write-post-modal', 'edit-post-modal', 'write-post-container', 'edit-post-container'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
    document.querySelectorAll('[data-admin-only]').forEach(function (el) {
      el.remove();
    });
  }

  function buildFormsHtml() {
    return (
      '<div class="modal fade" id="write-post-modal" tabindex="-1" aria-labelledby="write-post-modal-label" aria-hidden="true" data-admin-only="1">' +
      '<div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content">' +
      '<div class="modal-header"><h5 class="modal-title text-primary" id="write-post-modal-label">글쓰기</h5>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
      '<div class="modal-body"><form id="guestbook-form">' +
      '<div class="row g-2"><div class="col-md-6">' +
      '<input type="text" id="title" class="form-control" placeholder="Title" required></div>' +
      '<div class="col-md-6"><input type="text" id="nickname" class="form-control" placeholder="Nickname" required></div></div>' +
      '<div class="mt-2"><textarea id="message" class="form-control" placeholder="Message (HTML or plain text)" rows="8" required></textarea></div>' +
      '<div class="row g-2 mt-2"><div class="col-md-6">' +
      '<input type="password" id="password" class="form-control" placeholder="Password" required></div>' +
      '<div class="col-md-6 d-flex align-items-center">' +
      '<input type="checkbox" id="isSecret" class="form-check-input me-2"> <label for="isSecret" class="form-check-label">Secret</label></div></div>' +
      '<button type="submit" class="btn btn-primary w-100 mt-3">Submit</button>' +
      '</form></div></div></div></div>' +
      '<div class="modal fade" id="edit-post-modal" tabindex="-1" aria-hidden="true" data-admin-only="1">' +
      '<div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content">' +
      '<div class="modal-header"><h5 class="modal-title text-warning">Edit Message</h5>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
      '<form id="edit-guestbook-form" class="modal-body">' +
      '<input type="hidden" id="edit-id">' +
      '<div class="row g-2"><div class="col-md-6">' +
      '<input type="text" id="edit-title" class="form-control" placeholder="Title" required></div>' +
      '<div class="col-md-6"><input type="text" id="edit-nickname" class="form-control" placeholder="Nickname" required></div></div>' +
      '<div class="mt-2"><textarea id="edit-message" class="form-control" placeholder="Message" rows="8" required></textarea></div>' +
      '<div class="row g-2 mt-2"><div class="col-md-6">' +
      '<input type="password" id="edit-password" class="form-control" placeholder="Password" required></div>' +
      '<div class="col-md-6 d-flex align-items-center">' +
      '<input type="checkbox" id="edit-isSecret" class="form-check-input me-2"> <label for="edit-isSecret" class="form-check-label">Secret</label></div></div>' +
      '<button type="submit" class="btn btn-warning w-100 mt-3">Update</button>' +
      '</form></div></div></div>' +
      '<div class="guestbook-card shadow-lg p-4 mb-4 bg-white rounded" id="write-post-container" style="display:none" data-admin-only="1"></div>' +
      '<div class="guestbook-card shadow-lg p-4 mb-4 bg-white rounded" id="edit-post-container" style="display:none" data-admin-only="1"></div>'
    );
  }

  function injectAdminForms() {
    if (document.getElementById('write-post-modal')) return;
    if (!document.body) return;
    document.body.insertAdjacentHTML('beforeend', buildFormsHtml());
  }

  function run() {
    if (isAdminUnlocked()) {
      injectAdminForms();
      document.documentElement.setAttribute('data-ees-admin', '1');
    } else {
      stripPublicAdminForms();
      document.documentElement.removeAttribute('data-ees-admin');
    }
  }

  window.EesAdminListForms = {
    isUnlocked: isAdminUnlocked,
    unlock: function () {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch (_) {}
      injectAdminForms();
      document.documentElement.setAttribute('data-ees-admin', '1');
    },
    lock: function () {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
      stripPublicAdminForms();
      document.documentElement.removeAttribute('data-ees-admin');
    },
  };

  // 동기 실행: 가능하면 다른 list JS의 DOMContentLoaded보다 먼저 폼을 준비
  if (document.body) {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  }
})();
